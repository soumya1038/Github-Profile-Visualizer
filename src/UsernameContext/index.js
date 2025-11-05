import React from 'react'

const UsernameContext = React.createContext({
  username: '',
  changeUsername: () => {},
})

export default UsernameContext
