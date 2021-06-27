import { gql } from '@apollo/client';

export const Q_SPACE = gql`
   {
      launchesPast(limit: 5) {
         mission_name
      }
   }
`