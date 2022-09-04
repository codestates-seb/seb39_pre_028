import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import authAxios from "../Common/interceptor";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { filteredArrAtom, searchTextAtom } from "../Atom/atom";

const Container = styled.section`
  input {
    width: 550px;
    height: 30px;
  }

  @media all and (min-width: 1100px) and (max-width: 1490px) {
    display: flex;
  }

  @media all and (min-width: 900px) and (max-width: 1100px) {
    display: flex;
    width: 500px;
    margin-bottom: 15px;
  }

  @media all and (min-width: 768px) and (max-width: 900px) {
    display: flex;
    width: 400px;
    margin-bottom: 15px;
  }

  @media all and (max-width: 768px) {
    display: flex;
    width: 400px;
    margin-bottom: 15px;
  }
`;

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const setFilteredArrAtom = useSetRecoilState(filteredArrAtom);
  const filteredArrAtomValue = useRecoilValue(filteredArrAtom);
  const setSearchTextAtom = useSetRecoilState(searchTextAtom);
  const [isClicked, setIsClicked] = useState(false);

  const onChangeHandler = (e) => {
    setSearchText(e.target.value);
  };

  const SearchHandler = () => {
    if (searchText.length < 2) return alert("more letters required");
    return authAxios
      .get("/board/search")
      .then((res) => {
        console.log(res.data.question);
        let filteredArr = res.data.question.filter((question) => {
          return (
            (question.questionTitle.includes(searchText) ||
              question.questionContent.includes(searchText)) === true
          );
        });
        setFilteredArrAtom(filteredArr);
        setIsClicked(!isClicked);
        console.log("검색결과", filteredArrAtomValue);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleOnEnter = (e) => {
    if (e.key === "Enter") {
      SearchHandler();
    }
  };

  useEffect(() => {
    setSearchTextAtom(searchText);
  }, [isClicked]);

  return (
    <Container>
      <input
        onChange={onChangeHandler}
        onKeyPress={handleOnEnter}
        value={searchText}
        type="text"
      />
      <button className="searchbar" onClick={SearchHandler}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </Container>
  );
}

export default SearchBar;
