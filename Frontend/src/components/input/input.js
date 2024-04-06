import { forwardRef } from "react";
import styled from "styled-components";

const InputContainer = forwardRef(({ className, ...props }, ref) => {
  return (
      <input className={className} {...props} ref={ref}></input>
  );
});

export const Input = styled(InputContainer)`
    height: 40px;
    width: 300px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #black;
    font-size: 16px;
    padding: 10px;`;


export default Input

