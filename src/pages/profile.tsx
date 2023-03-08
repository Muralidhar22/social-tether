export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions)
    
    if(!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false
        }
      }
    }
    
    return {
      props: { session }
    }
  }

const Profile = () => {
    return(
        <>
        <div>
        Profile Page
            
        </div>
        </>
    )
}

export default Profile;