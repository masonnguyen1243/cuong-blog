import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect } from "react";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "~/store/slice/authSlice";
import { getAllComments } from "~/store/slice/commentSlice";
import { getPosts } from "~/store/slice/postSlice";

const DashboardOverview = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const { post } = useSelector((state) => state.post);
  const { allComments } = useSelector((state) => state.comment);
  console.log({ users, post, allComments });

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAllComments({}));
    dispatch(getPosts({}));
  }, [dispatch]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/*  */}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-sm uppercase">Total users</h3>
              <p className="text-2xl">{users?.data?.totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex text-green-500 items-center">
              <HiArrowNarrowUp />
              {users?.data?.lastMonthUsers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>

        {/*  */}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-sm uppercase">
                Total comments
              </h3>
              <p className="text-2xl">{allComments?.data?.totalComment}</p>
            </div>
            <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex text-green-500 items-center">
              <HiArrowNarrowUp />
              {allComments?.data?.lastMonthComments}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>

        {/*  */}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-sm uppercase">Total posts</h3>
              <p className="text-2xl">{post?.data?.totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex text-green-500 items-center">
              <HiArrowNarrowUp />
              {post?.data?.post}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 py-3 mx-auto">
        {/* Recent users */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent users</h1>
            <Button className="cursor-pointer">
              <Link to={"/dashboard?tab=users"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>User image</TableHeadCell>
                <TableHeadCell>Username</TableHeadCell>
              </TableRow>
            </TableHead>
            {users &&
              users.data.users.map((user) => (
                <TableBody key={user._id} className="divide-y">
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>

        {/* Recent comments */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent comments</h1>
            <Button className="cursor-pointer">
              <Link to={"/dashboard?tab=comments"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>Comment content</TableHeadCell>
                <TableHeadCell>Likes</TableHeadCell>
              </TableRow>
            </TableHead>
            {allComments &&
              allComments.data.comments.map((comment) => (
                <TableBody key={comment._id} className="divide-y">
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </TableCell>
                    <TableCell>{comment.numberOfLikes}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>

        {/* Recent posts */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent posts</h1>
            <Button className="cursor-pointer">
              <Link to={"/dashboard?tab=posts"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>Post image</TableHeadCell>
                <TableHeadCell>Post title</TableHeadCell>
                <TableHeadCell>Category</TableHeadCell>
              </TableRow>
            </TableHead>
            {post &&
              post.data.posts.map((post) => (
                <TableBody key={post._id} className="divide-y">
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>
                      <img
                        src={post.image}
                        alt={post.slug}
                        className="w-10 h-10 rounded-md bg-gray-500"
                      />
                    </TableCell>
                    <TableCell className="w-96">
                      <p className="line-clamp-2">{post.title}</p>
                    </TableCell>
                    <TableCell className="w-5">{post.category}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
};
export default DashboardOverview;
