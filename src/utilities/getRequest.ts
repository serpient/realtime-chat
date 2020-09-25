export const getRequest = (endpoint: string): Promise<{ data: any }> => {
  return new Promise(resolve => {
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        resolve(data)
      })
      .catch(err => console.log(err))
  })
}
