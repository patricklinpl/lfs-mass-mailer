
const validateEmail = (email) => {
  const verify = /\S+@\S+\.\S+/
  return verify.test(email)
}

const findEmails = ({headers, data}) => {
  return [...headers].filter(head => (validateEmail([...data][0][head]))).pop()
}

export {
      findEmails,
      validateEmail
  }
