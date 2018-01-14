export default function (err, req, res, next) {
  switch (err.message) {
    case 'wrong username or password':
      res.status(401)
      break
    case 'not found':
      res.status(404)
      break
    default:
      res.status(401)
  }

  res.json({ message: err.message })
}
