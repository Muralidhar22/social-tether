import { GetServerSideProps } from 'next';

import { authenticatedRoute } from '@/utils/redirection';
import getLayout from '@/layout';

export const getServerSideProps: GetServerSideProps = authenticatedRoute

const BookMarks = () => {
    return(<>
        <h1>Book marks</h1>
    </>)
}

BookMarks.getLayout = getLayout

export default BookMarks;