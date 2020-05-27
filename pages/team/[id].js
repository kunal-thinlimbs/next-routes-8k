
import NextLink from 'next/link';
import axios from 'axios'

import {GraphQLClient} from 'graphql-request'


export async function getStaticProps({ params }) {
 const callGraphqh=new
  GraphQLClient('https://api.devcdc.com/cricket')

const kj=await callGraphqh.request(`
query  team($teamID:String!){
     team(teamID:$teamID){
     name
      description
      shortName
      odiFormatDetails {
        basicdetails {
          seriesId
          format
          competitionType
        }
        firstMatch {
          matchId
          date
          result
          against {
            teamID
            teamName
            teamShortName
          }
          venue {
            venueID
            venueName
          }
        }
      }
      testFormatDetails {
        basicdetails {
          seriesId
          format
          competitionType
        }
        firstMatch {
          matchId
          date
          result
          against {
            teamID
            teamName
            teamShortName
          }
          venue {
            venueID
            venueName
          }
        }
      }
      t20FormatDetails {
        basicdetails {
          seriesId
          format
          competitionType
        }
        firstMatch {
          matchId
          date
          result
          against {
            teamID
            teamName
            teamShortName
          }
          venue {
            venueID
            venueName
          }
        }
      }
  
}
}
`,{
  teamID:params.id
})


    // const data=await axios.get(`https://jsonplaceholder.typicode.com/users/${params.id}`)
  

  return {
    props: {
      data:{
      
        name:kj.team.name,
        description:kj.team.description
      }
    }
  };
}

export async function getStaticPaths() {

  const callGraphqh=new
  GraphQLClient('https://api.devcdc.com/cricket')

const AllData=await callGraphqh.request(`

query{
getAllteamDetails(skip: 1, limit: 4000) {
 teamID
 name
 description}}
`)


//   const data3 = await await axios.get(`https://jsonplaceholder.typicode.com/users`)
// const data=data3.data


return {
    paths:AllData.getAllteamDetails.map((item) => ({
      params: {
        id: item.teamID.toString()
      }
    })),
    fallback: false
  };

}

export default ({ data }) => (
  <div >
    <h1>NAME: {data.name}</h1>
    
    <p >
      {data.description}
    </p>
    
    <NextLink href="/" passHref>
      <button as="a" mt={4} leftIcon="arrow-back">
        Back
      </button>
    </NextLink>
  </div>
);
