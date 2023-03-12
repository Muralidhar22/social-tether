import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { authenticatedRoute } from '@/utils/redirection';
import getLayout from '@/layout/Layout';
import Posts from '@/components/posts/Posts';

export const getServerSideProps: GetServerSideProps = authenticatedRoute

const Profile = () => {
  const router = useRouter()
  const { username } = router.query
  console.log({ username })
    return(
        <>
        <div>
          Profile Page
            
        </div>
        </>
    )
}

Profile.getLayout = getLayout;

export default Profile;