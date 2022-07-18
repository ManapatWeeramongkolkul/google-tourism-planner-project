exports.helloWorld = (req, res) => {
  const Pdfmake = require('pdfmake');
  const { BigQuery } = require('@google-cloud/bigquery');
  const { Storage } = require('@google-cloud/storage');
  const BUCKET = 'tourplanneragency_schedule';

  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  function queryTable() {
    let uid = '1';
    let autoGenCode = makeid(12);
    let file_name = `${autoGenCode}${uid}schedule.pdf`;
    // deleteTable(file_name)
    const bigqueryClient = new BigQuery();
    let sql = `SELECT * FROM \`RBHmockupDB.Event_Recorder\` WHERE user_id = '1' ORDER BY time_start`;
    const options = {
      query: sql
    };
    bigqueryClient.query(options).then((events) => {
      // events.forEach(event => {
      //   console.log(event)
      // });
      createPdf(events, file_name)
    }).catch(err => {
      console.log(err)
    })
  }

  async function deleteTable(fileName) {
    console.log("Entered deleteTable")
    const storage = new Storage();
    await storage.bucket(BUCKET).file(fileName).delete();
    console.log("Old file deleted")
  }

  async function createPdf(queryResult, fileName) {
    return new Promise(function (resolve, reject) {
      // Manipulate table
      let session_name = req.body.sessionInfo.session;

      // Setup PDF content
      var data = []

      function buildTableBody(data, columns) {
        var body = [];
        body.push(columns);
        var number = 1;
        data.forEach(function (row) {
          var dataRow = [];
          dataRow.push(number.toString());
          dataRow.push(row.event_type.toString());
          dataRow.push(row.time_start.value.toString());
          dataRow.push(row.time_end.value.toString());
          dataRow.push(row.budget.toString());
          dataRow.push(row.location_start.toString());
          dataRow.push(row.location_end.toString());
          dataRow.push(row.description.toString());
          body.push(dataRow);
          number++;
        });

        return body;
      }

      function table(data, columns) {
        return {
          table: {
            headerRows: 1,
            // widths: [50, 50, 50, 50, 50, 50, 50, 50],
            widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto"],
            body: buildTableBody(data, columns)
          }
        };
      }


      // PDF creation
      var fonts = {
        Roboto: {
          normal: 'fonts/Roboto-Regular.ttf',
          bold: 'fonts/Roboto-Medium.ttf',
          italics: 'fonts/Roboto-Italic.ttf',
          bolditalics: 'fonts/Roboto-MediumItalic.ttf'
        }
      };
      let pdfmake = new Pdfmake(fonts);
      let docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        // pageMargin: [40, 60, 40, 60],
        content: [
          { text: 'Trip Schedule', style: 'header' },
          { text: 'Created by MyTrip', style: 'subheader' },
          table(queryResult[0], ['Item ID', 'Event Type', 'Time Start', 'Time End', 'Budget', 'Location Start', 'Location End', 'Description'])
        ],
        styles: {
          header: {
            fontSize: 40,
            bold: true
          },
          subheader: {
            fontSize: 20,
            bold: true
          },
          quote: {
            italics: true
          },
          small: {
            fontSize: 8
          }
        }
      }
      let pdfDoc = pdfmake.createPdfKitDocument(docDefinition);

      // Storage
      const storage = new Storage();
      const pdfFile = storage.bucket(BUCKET).file(fileName);

      pdfDoc.pipe(pdfFile.createWriteStream()).on('finish', () => {
        console.log('PDF sucessfully created!');
        resolve(fileName);
      })
        .on('error', err => {
          console.log('Error during the writestream operation in the new file');
          reject(new Error('ERROR something went wrong with the following error message: ' + err));
        })
      // pdfDoc.pipe(fs.createWriteStream('pdfs/test.pdf'));
      pdfDoc.end();
      let scheduleurl = `storage.googleapis.com/tourplanneragency_schedule/${fileName}`
      let jsonResponse = {
        "session_info": {
          "session": session_name,
          "parameters": {
            "scheduleurl": scheduleurl
          }
        }
      }
      res.status(200).send(jsonResponse);
    });
  }

  queryTable()
  // const queryResult = queryTable()
  // createPdf(queryResult)

}