import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { signUp, signIn, confirmAuthCode } from './cognito';
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world',
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};

export const signUpHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const response = await signUp('parabsneha19@gmail.com', '123456test');
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: response,
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};

export const confirmUserHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const response = await confirmAuthCode('176812');
        return { statusCode: 200, body: JSON.stringify({ message: response }) };
    } catch (err) {
        console.log('->> err ', err);
        return { statusCode: 500, body: JSON.stringify({ message: 'some error happened' }) };
    }
};

export const signInHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const response = await signIn('parabsneha19@gmail.com', '123456test');
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: response,
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};