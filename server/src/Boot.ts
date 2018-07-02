import app from './Server'

const port: string = process.env.PORT || '8000'

app.listen(port, (err) => {
  if (err) {
    // tslint:disable-next-line:no-console
    return console.log(err)
  }

  // tslint:disable-next-line:no-console
  return console.log(`server is listening on ${port}`)
})
