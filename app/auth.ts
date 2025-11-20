import NextAuth, { AuthOptions, getServerSession } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials"

const GOOGLE_CLIENT_ID = process.env.AUTH_GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.AUTH_GOOGLE_CLIENT_SECRET
const AUTH_USERNAME = process.env.AUTH_USERNAME
const AUTH_PASSWORD = process.env.AUTH_PASSWORD

const providers = []

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          scope: "openid email profile https://www.googleapis.com/auth/spreadsheets"
        },
      },
    }),
  )
}

if (AUTH_USERNAME && AUTH_PASSWORD) {
  providers.push(
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password", placeholder: "********" }
      },
      async authorize(credentials, req) {
        if (credentials?.username == AUTH_USERNAME && credentials?.password == AUTH_PASSWORD) {
          return {username: AUTH_USERNAME, id: AUTH_USERNAME}
        }

        // Return null if user data could not be retrieved
        return null
      }
    })
  )
}

const authOptions: AuthOptions = {
  providers: providers,
  callbacks: {
    async redirect({ url, baseUrl }) {
      // ALWAYS redirect to /admin after sign in
      return "/admin";
    },
  },
  theme: {
    colorScheme: "light",

  }
}

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }