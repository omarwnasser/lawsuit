import {Schema,model} from 'mongoose';

const ResolutionSchema = new Schema({
    employee_name: String,
    resolutionData: [
        {
            question: String,
            text: String,
            answer: String
        }
    ],
});

const ResolutionModel =  model('resolution',ResolutionSchema);

export default ResolutionModel;