
import NextLink from 'next/link';
import axios from 'axios'

import {GraphQLClient} from 'graphql-request'


export async function getStaticProps({ params }) {
 const callGraphqh=new
  GraphQLClient('https://api.devcdc.com/cricket')

const kj=await callGraphqh.request(`
query  playersDetails($playerID:String!){
     playersDetails(playerID:$playerID){
      name
     birthPlace
    dob
    description
    battingStyle
    bowlingStyle
    
}
}
`,{
  playerID:params.id
})


    // const data=await axios.get(`https://jsonplaceholder.typicode.com/users/${params.id}`)
  

  return {
    props: {
      data:{
      
         name:kj.playersDetails.name,
        dob:kj.playersDetails.dob
      }
    }
  };
}

export async function getStaticPaths() {

  const callGraphqh=new
  GraphQLClient('https://api.devcdc.com/cricket')

const AllData=await callGraphqh.request(`

query{
getAllplayersDetails(skip: 1, limit: 8000) {
 name
    playerID
    birthPlace
    dob
    description
    battingStyle
    bowlingStyle}}
`)


//   const data3 = await await axios.get(`https://jsonplaceholder.typicode.com/users`)
// const data=data3.data


return {
    paths:AllData.getAllplayersDetails.map((item) => ({
      params: {
        id: item.playerID.toString()
      }
    })),
    fallback: false
  };

}

export default ({ data }) => (
  <div >
    <h1>NAME: {data.name}</h1>
    
    <p >
      {data.dob}
    </p>
    
    <NextLink href="/" passHref>
      <button as="a" mt={4} leftIcon="arrow-back">
        Back
      </button>
    </NextLink>
  </div>
);
