import "./FrontPage.css"

import ShareForm from '../FrontPage/ShareForm'
import Post from '../FrontPage/Post'
import fakeData from '../../examples/dummyDatas'

const FrontPage = (props) => {
    return (
        <div className="frontpage" >
                <ShareForm />
                <Post user={fakeData.userOne} post={fakeData.postOne} img={"https://i.imgur.com/iT8zBtl.jpeg"}/>
                <Post user={fakeData.userTwo} post={fakeData.postThree}/>
        </div>
    )
}

export default FrontPage;