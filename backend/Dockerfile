# syntax=docker/dockerfile:1

FROM golang:1.16-alpine

WORKDIR /app 
# WORKDIR inside the image

COPY go.mod ./
COPY go.sum ./
RUN go mod download
# RUN go get myapp
# RUN go install

COPY . .

RUN go build -o main main.go

EXPOSE 8000
CMD [ "/app/main" ]