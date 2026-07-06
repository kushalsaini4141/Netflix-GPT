export const checkValidate = (
    email,
    password,
    fullName,
    signInForm
) => {

    if (!signInForm) {
        const isnamevalid = /^[A-Za-z ]+$/.test(fullName);

        if (!isnamevalid) {
            return "Enter the valid name";
        }
    }

    const isemailvalid =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    if (!isemailvalid) {
        return "Email is not valid";
    }

    const ispasswordvalid =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    if (!ispasswordvalid) {
        return "Password is not valid";
    }

    return null;
};