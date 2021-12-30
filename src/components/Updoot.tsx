import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react'
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootProps {
  post: PostSnippetFragment
}

export const Updoot: React.FC<UpdootProps> = ({post}) => {
  const [loadingState, setLoadingState] = useState<'updoot-loading' | 'downdoot-loading' 
      | 'not-loading'>('not-loading')
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" alignItems="center" mr="4">
      <IconButton 
      icon={<ChevronUpIcon />}
      onClick={async ()=>{
        if (post.voteStatus === 1){
          return;
        }
        setLoadingState("updoot-loading")
        await vote({
          postId: post.id,
          value: 1,
        });
        setLoadingState("not-loading")
      }}
      colorScheme={post.voteStatus === 1 ? "green" : "gray"}
      isLoading={loadingState === "updoot-loading"}
      aria-label="updoot post"
      />
      {post.points} 
      <IconButton
      icon={<ChevronDownIcon />}
      onClick={async ()=>{
        if (post.voteStatus === -1){
          return;
        }
        setLoadingState("downdoot-loading")
        await vote({
          postId: post.id,
          value: -1,
        });
        setLoadingState("not-loading");
      }}
      colorScheme={post.voteStatus === -1 ? 'red' : 'gray'}
      isLoading={loadingState==="downdoot-loading"}
      aria-label="downdoot post"
      />
    </Flex>
  );
}