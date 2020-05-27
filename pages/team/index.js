
import axios from 'axios'
import Layout from '../../components/user';


import {GraphQLClient} from 'graphql-request'


export async function getStaticProps() {
  const callGraphqh=new
   GraphQLClient('https://api.devcdc.com/cricket')

const vb=await callGraphqh.request(`

query{
getAllteamDetails(skip: 1, limit: 4000) {
  teamID
  name
  description}}
`)


  // console.log(data)
  

  return {
    props: {
      User:vb.getAllteamDetails
    }
  };
}

export default ({ User }) => (
  <>
   
    <div style={{display:'flex',
  flexWrap:'wrap'}}>

  
      {User.map((item) => (
        <Layout key={item.id} {...item} />
      ))}
    </div>
  </>
);
