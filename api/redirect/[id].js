export default function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send("Missing item ID");
  }

  // Redirect to the SPA route
  res.writeHead(307, { Location: `/item/${id}` });
  res.end();
}
