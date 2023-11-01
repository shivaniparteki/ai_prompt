import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@/models/user';

const nextAuth = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],

  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      })

      session.user.id = sessionUser._id.toString()

      console.log({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
      console.log("session");
      console.log(session);

      return session;
    },

    async signIn({ profile }) {
      try {
        // await connectToDatabase()

        // if the user already exists
        const user = await User.findOne({
          email: profile.email
        })

        // if not, then create a new user
        if (!user) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.image,
          })
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});


export default nextAuth;

