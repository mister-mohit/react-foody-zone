import styled from "styled-components";
import Searchresult from "./components/Searchresult";
import { useEffect, useState } from "react";
export const BASE_URL = "http://localhost:9000";

function App() {

  const[data, setData] = useState(null);
  const[error, setError] = useState(null);
  const[loading, setLoading] = useState(null);
  const[filteredData, setFilteredData] = useState(null);
  const[filterType, setFilterType] = useState(null);
  
  function search(event){

    const searchedText = event.target.value;

    if(searchedText === ""){
      setFilteredData(data);
      return;
    }    

    const searchedFood =  data?.filter((food) => 
        food.name.toLowerCase().includes(searchedText.toLowerCase())
    );

    setFilteredData(searchedFood);
  }

  function filter(value){

    if(value === "all"){
      setFilteredData(data);
      setFilterType("all");
      return;
    }

    const searchedFood =  data?.filter((food) => 
        food.type.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(searchedFood);
    setFilterType(value);
  }

  useEffect(() => {
    async function fetchFoodData(){

      setLoading("Loading");
  
      try{
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setError(null);
      }catch(error){
        setError("Unable to fetch Data")
      }
  
      setLoading(null);
    }
  
    fetchFoodData();
  
  }, []);

  if(error) return error;
  if(loading) return loading; 

  const buttons = [
    {
      name: "All",
      type: "all"
    },
    {
      name: "Breakfast",
      type: "breakfast"
    },
    {
      name: "Lunch",
      type: "lunch"
    },
    {
      name: "Dinner",
      type: "dinner"
    }
  ];

  return( <>
  <Container>

    <LogoSearchContainer>

      <div className="logo" >
        <img src="Foody Zone.svg" alt="food zone logo" />
      </div>

      <div className="search">
        <input onChange={search} placeholder="Search here.." />
      </div>
    </LogoSearchContainer>

    <FilterButtonContainer>
      {buttons.map(({name, type}) => 
        <Button isselected={type == filterType} onClick={() => filter(type)} key={type}>{name}</Button>
      )}
    </FilterButtonContainer>

  </Container>
  <Searchresult data={filteredData ? filteredData : data}  />
  </>
  );
}

export default App;

const Container = styled.section`
  height: 202px;
`;

const LogoSearchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 42px;
  display: flex;
  justify-content: space-between;

  .search{
    input{
      width: 285px;
      height: 40px;
      font-size: 16px;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid red;
      background-color: transparent;

      &::placeholder{
        color: white;
      }
    }
  }

`;

const FilterButtonContainer = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: center;
  height: calc(100% - 40px);
`;

export const Button = styled.button`
  color: white;
  font-size: 16px;
  padding: 6px 12px;
  border-radius: 5px;
  border: 1px solid ${({isselected}) => isselected ? "white" : "#FF4343"};
  background-color: ${({isselected}) => isselected ? "#FF9343" : "#FF4343"};
  cursor: pointer;

  &:hover{
    background-color: #FF9343;
    border: 1px solid ${({isselected}) => isselected ? "white" : "#FF4343"};
  }
`;



