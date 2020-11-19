export const share = model =>
  fetch(`${process.env.FUNCTIONS_HOST}/${model.method}-share`, {
    method: 'POST',
    body: JSON.stringify(model),
  }, {
    headers: { 'Content-Type': 'application/json' }
  }).then(({ ok }) => ok) // TODO handle lambda failure
