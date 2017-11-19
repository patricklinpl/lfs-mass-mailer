const shouldShowPreview = ({ data, view, headers }) => (Array.isArray(data) && Array.isArray(headers) && headers.length >= 1 && data.length >= 1 && view === 'preview')

const getValidEmails = ({data, emailHeader}) => ([...data].filter(row => (validateEmail(row[emailHeader]))).map(row => (row[emailHeader])))

const findEmails = ({headers, data}) => ([...headers].filter(head => (validateEmail([...data][0][head]))).pop())

const validateEmail = (email) => {
  const verify = /\S+@\S+\.\S+/
  return verify.test(email)
}

export {
      findEmails,
      validateEmail,
      shouldShowPreview, 
      getValidEmails
  }
