import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from "next/link";

import { authenticatedRoute } from '@/utils/redirection';
import getLayout from '@/layout';

import Posts from '@/components/posts/Posts';

export const getServerSideProps: GetServerSideProps = authenticatedRoute

const Profile = () => {
  const router = useRouter()
  const { username } = router.query

    return(
        <>
        <div className="flex justify-between">
          Profile Page
          {username}
          <Link href={`/${username}?edit=true`} shallow>Edit profile</Link>
        </div>
        </>
    )
}

Profile.getLayout = getLayout;

export default Profile;