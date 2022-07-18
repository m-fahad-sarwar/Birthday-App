import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import db from "../config/Firebase";


const fetchData = createAsyncThunk(
    'birthday/fetchData',
    async () => {

        try {
            const dob = [];
            await db.collection('Dob').get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        dob.push({
                            ...doc.data()
                            , id: doc.id
                        });

                    })
                });
            console.log(dob)
            return dob;
        } catch (error) {
            alert(error)
        }

    }
)
const addData = createAsyncThunk(
    'birthday/addData',
    async (data) => {
        try {
            const resValue = await db.collection('Dob').add(data)
            return {
                ...data,
                id: resValue.id
            }
        } catch (error) {
           alert(error);

        }
    }
)
const eraseData = createAsyncThunk(
    'birthday/eraseData',
    async (id) => {
        try {
            const resValue = await db.collection('Dob').doc(id).delete()
            return id;
        } catch (error) {
           alert(error);

        }
    }
)
const BirthdaySlice = createSlice({
    name: 'birthday',
    initialState: {
        data: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(addData.fulfilled, (state, action) => {

            let newData = [...state.data, action.payload]
            alert('Data successfully added')
            return {
                ...state,
                data: newData,
            }
        })
        builder.addCase(eraseData.fulfilled, (state, action) => {
             let erased = state.data.filter((data) => data.id !== action.payload)
             alert('Task successfully deleted')
             console.log(erased);
             return []
            })
           
        },

}

)

export { fetchData, addData , eraseData}
export default BirthdaySlice;