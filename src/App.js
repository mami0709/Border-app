import { useSelector, useDispatch } from "react-redux";
import { addPost, deletePost } from "./features/Posts";
import { useState } from "react";
import { Heading, Box, Text, Input, Button,Stack,   } from '@chakra-ui/react'


function App() {
  const [name, setName] = useState();
  const [content, setContent] = useState();

  const postList = useSelector((state) => state.posts.value);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      addPost({
        id: postList.length + 1,
        name: name,
        content: content,
      })
    );
    setName("");
    setContent("");
  };

  return (
    <>
      <Box fontFamily="Helvetica Neue" textAlign="center" margin="0px auto" paddingTop="50px" bg='MistyRose' >
        <Heading>React-Redux掲示板</Heading>
        <Box marginTop="20px" paddingBottom={"30px"}>
          <Input bg='white' maxWidth={"40%"} marginRight="10px" type="text" placeholder="お名前" onChange={(e) => setName(e.target.value)} value={name}/>
          <Input bg='white' maxWidth={"40%"} marginRight="10px" type="text" placeholder="投稿内容" onChange={(e) => setContent(e.target.value)} value={content}/>
          <Button colorScheme='blue' onClick={() => handleClick()}>投稿</Button>
        </Box>
        <hr style={{color:"white"}} />

        <Box p='6' maxWidth={"70%"} textAlign="center" margin="0px auto" >
          {postList.map((post) => (
            <Box key={post.id} className="post">
              <Box 
                marginTop="40px" bg='white'
                boxShadow=" 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                borderRadius="20px"
                >
                <Stack>
                <Text marginTop="10px" fontSize='3xl' fontWeight={"bold"}>{post.name}</Text>
                <Text fontSize='xl'>{post.content}</Text>
                </Stack>
                <Button marginTop="10px" marginBottom="10px" colorScheme='purple' onClick={() => dispatch(deletePost({id: post.id}))}>削除</Button>
              </Box>
            </Box>
          ))}

        </Box>
      </Box>
    </>
  );
};

export default App;
