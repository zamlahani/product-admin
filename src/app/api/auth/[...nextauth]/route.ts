import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // eslint-disable-next-line max-len
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // console.log('credentials:', credentials)
        // Add logic here to look up the user from the credentials supplied

        const { username, password } = credentials || {}
        if (!username || !password) {
          return null
        }
        const res = await axios.post('https://dummyjson.com/auth/login', {
          username,
          password,
        })
        // console.log('res.data:', res.data)

        if (res.status == 200) {
          // Any object returned will be saved in `user` property of the JWT
          return res.data
        } else {
          // eslint-disable-next-line max-len
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // eslint-disable-next-line max-len
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
})

export { handler as GET, handler as POST }
