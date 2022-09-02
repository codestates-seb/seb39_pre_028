import authAxios from "../Common/interceptor";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  questionAtom,
  answerAtom,
  filteredArrAtom,
  searchTextAtom,
} from "../Atom/atom";
import QuestionItem from "./QuestionItem";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const BoardContainer = styled("section")`
  margin: 8px 30px;
  height: auto;

  .question_length {
    font-size: 18px;
    font-weight: 350;
  }
`;

const BoardHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-weight: 400;
    font-size: 30px;
  }

  button {
    height: 48px;
    font-size: 17px;
    margin-top: 5px;
    padding: 0 13px;
    color: #ffffff;
    background-color: #0a95ff;
    border: 0;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    &.searchbar {
      height: 35px;
      margin-left: 5px;
    }
  }

  button:hover {
    background-color: #0074cc;
  }
`;

const BoardBox = styled("ul")`
  margin: 30px 0;
  list-style: none;
  padding-left: 0px;
  border-top: 1px solid #b5b1b1;

  a {
    text-decoration: none;
  }
`;

const NoResult = styled.div`
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;

  b {
    margin-left: 10px;
    font-size: x-large;
  }
  span {
    font-size: smaller;
    &.margin {
      margin-top: 5px;
    }
  }
`;

function Search() {
  const [questionsAtom, setQuestionsAtom] = useRecoilState(questionAtom);
  const [answersAtom, setAnswersAtom] = useRecoilState(answerAtom);
  const searchResult = useRecoilValue(filteredArrAtom);
  const searchedText = useRecoilValue(searchTextAtom);
  const clickHandler = (question) => {
    return authAxios
      .get(`/questions/${question.questionId}`)
      .then((res) => {
        setQuestionsAtom(res.data.question);
        console.log(questionsAtom);
        setAnswersAtom(res.data.answer);
        console.log(answersAtom);
      })
      .catch((err) => {
        console.log("실패");
        console.log(err.message);
      });
  };
  return (
    <BoardContainer>
      <BoardHeader>
        <h1>Search for Questions</h1>

        <SearchBar />
      </BoardHeader>
      <div className="question_length">{searchResult.length} results</div>

      <BoardBox>
        {searchResult.length < 1 && (
          <NoResult>
            <FontAwesomeIcon icon={faSearch} size="7x" color="#E3E6E8" />
            <div>
              We couldn't find anything for <b>{searchedText}</b>
            </div>
            <span className="margin">Search options: not deleted</span>
            <span> Try different or less specific keywords.</span>
          </NoResult>
        )}

        {Array.isArray(searchResult) &&
          searchResult.map((question, idx) => (
            <div key={idx} onClick={() => clickHandler(question)}>
              <Link to={`/questions/${question.questionId}`}>
                <QuestionItem question={question} />
              </Link>
            </div>
          ))}
      </BoardBox>
    </BoardContainer>
  );
}

export default Search;
