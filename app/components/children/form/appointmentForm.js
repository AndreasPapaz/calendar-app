import React, { PropTypes } from 'react';
import { Button, Checkbox, Form, Icon, Card} from 'semantic-ui-react';
import axios from 'axios';


const AppointmentForm = ({
	onSubmit,
	data,
}) => (
  <Form className='' action='/' onSubmit={onSubmit}>
		<Form.Field>
			<label>Title</label>
			<input
			name='title'
			value={'test'}
			placeholder='what did you do today!' />
		</Form.Field>

		 <Button type='submit' primary>Post</Button>

	</Form>
);

// AppointmentForm.propTypes = {
// 	onSubmit: PropTypes.func.isRequired,
// 	entry: PropTypes.object.isRequired
// };

export default AppointmentForm;
