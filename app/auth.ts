import NextAuth, { AuthOptions, getServerSession } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials"

const AUTH_GOOGLE_CLIENT_ID = process.env.AUTH_GOOGLE_CLIENT_ID
const AUTH_GOOGLE_CLIENT_SECRET = process.env.AUTH_GOOGLE_CLIENT_SECRET
const AUTH_USERNAME = process.env.AUTH_USERNAME
const AUTH_PASSWORD = process.env.AUTH_PASSWORD
const ADMIN_GOOGLE_SA_PRIVATE_KEY = process.env.ADMIN_GOOGLE_SA_PRIVATE_KEY
const ADMIN_GOOGLE_SA_EMAIL = process.env.ADMIN_GOOGLE_SA_EMAIL
const AUTH_SECRET = process.env.AUTH_SECRET

const providers = []

if (AUTH_GOOGLE_CLIENT_ID && AUTH_GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: AUTH_GOOGLE_CLIENT_SECRET!,
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
        if (credentials?.username === AUTH_USERNAME && credentials?.password === AUTH_PASSWORD) {
          return {username: AUTH_USERNAME, id: AUTH_USERNAME}
        }

        // Return null if user data could not be retrieved
        return null
      }
    })
  )
}

const authOptions: AuthOptions = {
  secret: AUTH_SECRET,
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

/**
 * If the user has not set the username/password or the google service account creds we should not show the admin interface.
 * Otherwise we'll see errors for authentication
 */
const isAdminInterfaceEnabled = () => (
  (ADMIN_GOOGLE_SA_EMAIL != null && ADMIN_GOOGLE_SA_PRIVATE_KEY != null)
  || (AUTH_USERNAME != null  && AUTH_PASSWORD != null)
)

export { authOptions, getSession, isAdminInterfaceEnabled }