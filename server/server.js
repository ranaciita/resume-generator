import express from 'express'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('This is the Resume Generator server/backend!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
