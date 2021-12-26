import { Box } from '@chakra-ui/react';
import React from 'react'

export type WrapperVariant = 'small' | 'large';

interface WrapperProps {
  variant?: WrapperVariant 
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular"
}) => {
    return (
      <Box mt={8} w="100%" mx="auto" maxW={variant === "regular" ? "800px" : "400px"}>
        {children}
      </Box>
    );
}