import styled from "styled-components";
import { BASE_URL, Button } from "../App";

const Searchresult = ({data}) => {

  
  return (
    <FoodContainer>
        <FoodCards>
            {data?.map(({name, price, text, image, type}) => 
                <FoodCard key={name}>
                    <div className="food_image">
                        <img src={BASE_URL + image} alt="food" />
                    </div>
                    <div className="food_info">
                        <div className="info" >
                            <h3>{name}</h3>
                            <p>{text}</p>
                        </div>
                        <Button>${price.toFixed(2)}</Button>
                    </div>
                </FoodCard>
            )}
        </FoodCards>
    </FoodContainer>
  );
}

export default Searchresult;

const FoodContainer = styled.section`
height: calc(100vh - 202px);
background-image: url("/bg.png");
background-size: cover;
`;

const FoodCards = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    column-gap: 20px;
    justify-content: center;
    align-items: center;
`;

const FoodCard = styled.div`
    display: flex;
    width: 340px;
    height: 167px;
    padding: 10px;
    border-radius: 19.447px;
    border: 0.659px solid #98F9FF;
    background: url(<path-to-image>), lightgray 0% 0% / 50.8334219455719px 50.8334219455719px repeat, radial-gradient(151.92% 127.02% at 15.32% 21.04%, rgba(165, 239, 255, 0.20) 0%, rgba(110, 191, 244, 0.04) 77.08%, rgba(70, 144, 212, 0.00) 100%);
    background-blend-mode: overlay, normal;
    backdrop-filter: blur(13.184196472167969px);

    .info{
        color: white;
        padding: 5px;
        h3{
            font-size: 16px;
            font-weight: 600;
        }
        p{
            margin-top:8px;
            font-size: 13px;
        }
    }

    .food_info{
        display: flex;
        gap: 30px;
        flex-direction: column;
        align-items: end;
    }
`;
