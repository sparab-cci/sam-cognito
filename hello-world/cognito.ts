import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
// import AWS from 'aws-sdk';

const REGION = 'us-east-1';
const USER_POOL_ID = 'us-east-1_d56yukuWX';
const CLIENT_ID = '7ckrjh0scgmvcfk9etc2i1fh67';

const userPool = new CognitoUserPool({
    UserPoolId: USER_POOL_ID,
    ClientId: CLIENT_ID
});

export const signUp = async (email: string, password: string): Promise<CognitoUser> => {
    const attributeList = [
        new CognitoUserAttribute({
            Name: 'email',
            Value: email,
        }),
    ];

    return new Promise((resolve, reject) => {
        userPool.signUp(email, password, attributeList, attributeList, (err, result) => {
            if (err) {
                console.log('-> er', err.message)
                reject(err);
            } else {
                console.log('-> su')
                resolve(result!.user);
            }
        });
    });
};


export const signIn = async (email: string, password: string): Promise<string> => {
    const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
    });

    const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
    });

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (result) => {
                resolve(result.getIdToken().getJwtToken());
            },
            onFailure: (err) => {
                reject(err);
            },
        });
    });
};
