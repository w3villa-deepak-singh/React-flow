// submit.js

export const SubmitButton = () => {

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button type="submit"
            style={{
                width: '120px',
                height: '47px',
                fontSize: '22px',
                padding: '6px',
                borderRadius: '6px',
                backgroundColor: 'rgb(28, 37, 54)',
                color: 'white'
            }}
            >Submit</button>
        </div>
    );
}
