import React, { PropTypes } from 'react';
import { Button, Checkbox, Form, Icon, Card} from 'semantic-ui-react';
import axios from 'axios';


const AppointmentForm = ({
	onSubmit,
  onChange,
	entry,
}) => (
  <Form className='' action='/' onSubmit={onSubmit}>
		<Form.Field>
			<label>Title</label>
			<input
			name='body'
      onChange={ onChange }
			value={ entry.body }
			placeholder='Todays Task' />
		</Form.Field>

		 <Button type='submit' primary>Post</Button>

	</Form>
);

// AppointmentForm.propTypes = {
// 	onSubmit: PropTypes.func.isRequired,
// 	formatDate: PropTypes.object.isRequired
// };

export default AppointmentForm;
