import styled from 'styled-components';

const Wrapper = styled.section`
  padding-top: 52px;
`;

const Column = styled.div`
  display: flex;
`;

const Options = styled.form`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  padding: 15px;
  background: #0d0d0d;
  width: 100%;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + span {
  background-color: #2196F3;
  }
  &:focus + span {
    box-shadow: 0 0 1px #2196F3;
  }
  &:checked + span:before{
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;
const InputLabel = styled.label`
  color: #fff;
  display: block;
  font-size: 20px;
  font-weight: 600;
  margin-right: 15px;
`;
const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-right: 50px;
`;

const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
  :before{
    border-radius: 50%;
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

`;
const RangeSlider = styled.input`

`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin: 0;
`;

const Button = styled.button`
  color: #fff;
  background-color: #000;
`;

export {
  Wrapper,
  Column,
  Image,
  Button,
  Options,
  SwitchInput,
  SwitchLabel,
  SwitchSlider,
  InputLabel,
  RangeSlider
}
