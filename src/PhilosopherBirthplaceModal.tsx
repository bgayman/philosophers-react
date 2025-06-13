import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Modal from './Modal';
import Map from './Map';
import colors from './color';
import LoadingBounce from './LoadingBounce';

const PHILOSOPHER_BIRTHPLACE_QUERY = gql`
  query PhilosopherByUsernameBirth($name: String!) {
    philosopherByUsername(name: $name) {
      id
      name
      username
      birthLocation {
        name
        latitude
        longitude
      }
    }
  }
`;

interface PhilosopherBirthplaceModalProps {
  username: string;
}

const PhilosopherBirthplaceModal: React.FC<PhilosopherBirthplaceModalProps> = ({
  username,
}) => {
  const { loading, error, data } = useQuery(PHILOSOPHER_BIRTHPLACE_QUERY, {
    variables: { name: username }
  });


  if (loading) return (
    <Modal>
      <LoadingBounce />
    </Modal>
  );

  if (error || !data?.philosopherByUsername?.birthLocation) return null;

  const philosopher = data.philosopherByUsername;

  console.log(loading, error, data);


  return (
    <Modal backgroundColor='#ffffff00' shadowOpacity={0}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '400px',
        width: '100%',
        maxWidth: '600px',
        position: 'relative'
      }}>
        {/* Map */}
          <Map 
            markers={[{
              id: philosopher.id,
              name: philosopher.name,
              birthLocation: philosopher.birthLocation,
            }]}
            initialRegion={{
              latitude: philosopher.birthLocation.latitude,
              longitude: philosopher.birthLocation.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }}
          />
        </div>
    </Modal>
  );
};

export default PhilosopherBirthplaceModal;