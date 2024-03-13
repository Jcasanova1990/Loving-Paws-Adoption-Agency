// AnotherPage.js

import React from 'react';
import CreateForm from '../components/CreateForm/CreateForm'; // Adjust the path as necessary

export default function PlacementPage(props) {
    // Assuming props.user, props.token, and props.createAnimal are available

    return (
        <div>
            <h1>This is PlacementPage</h1>
            <CreateForm
                user={props.user} // Pass user prop
                token={props.token} // Pass token prop
                createAnimal={props.createAnimal} // Pass createAnimal function
            />
        </div>
    );
}
