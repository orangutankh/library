import React, { useContext, useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataContext } from '../hooks/dataContext';
import { DataItemInterfaceWithId } from '../typesInterfaces/dataItem';
import { getRandomInt } from '../utils/number';
import DataItem from './DataItem';

const QuizzModalStyled = styled('div')(() => (`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`));

interface Props {
  open?: boolean,
}

const QuizzModal = ({ open = true }: Props) => {
  const { dataStore } = useContext(DataContext);

  const [questionToShow, setQuestionToShow] = useState<DataItemInterfaceWithId | undefined>();

  const questions = useMemo(() => {
    return (dataStore || []).filter((data) => data.type === 'question');
  }, [dataStore]);

  const handlerQuizzQuestion = () => {
    if (open && questions.length) {
      const nextQuestion = questions[getRandomInt(questions.length)];
      setQuestionToShow(nextQuestion);
    }
  }

  useEffect(() => {
    handlerQuizzQuestion();
  }, [
    open,
    questions
  ]);

  const theme = useTheme();


  if (!open || !questionToShow) return null;

  return (
    <QuizzModalStyled theme={theme}>
      <DataItem data={questionToShow} canEdit={false} quizzMode={true} handlerQuizzQuestion={handlerQuizzQuestion} />
    </QuizzModalStyled>
  );
}

export default QuizzModal;
