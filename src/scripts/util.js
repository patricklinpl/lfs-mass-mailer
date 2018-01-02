const showPreview = ({ data, view, headers }) => (Array.isArray(data) && Array.isArray(headers) && headers.length >= 1 && data.length >= 1 && view === 'preview')

const showTemplate = ({ data, view, headers, emailHeader }) => (Array.isArray(data) && Array.isArray(headers) && headers.length >= 1 && data.length >= 1 && view === 'write' && emailHeader.length >= 1)

const getValidEmails = ({ data, emailHeader }) => (data.filter(row => (validateEmail(row[emailHeader]))).map(row => (row[emailHeader])))

const getInvalidEmails = ({ data, emailHeader }) => (data.filter(row => (invalidateEmail(row[emailHeader]))))

const findEmails = ({ headers, data }) => (headers.filter(head => (validateEmail([...data][0][head]))).pop())

const validateEmail = (email) => {
  const verify = /\S+@\S+\.\S+/
  return verify.test(email)
}

const invalidateEmail = (email) => {
  const verify = /\S+@\S+\.\S+/
  return !verify.test(email)
}

export {
  showPreview,
  showTemplate,
  getValidEmails,
  findEmails,
  getInvalidEmails
}
