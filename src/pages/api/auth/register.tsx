import axios from "@/utils/axios";
import { NextApiRequest, NextApiResponse } from 'next'

/*
curl -X POST http://localhost:8080/auth/signup -H 'Content-Type:application/json' -H 'Authorization: Bearer ' -d '{ "email":"ben-09@kr.accommate.com", "password":"password"}'
curl -X POST http://localhost:8080/auth/login -H 'Content-Type:application/json' -H 'Authorization: Bearer ' -d '{ "email":"ben-01@kr.accommate.com", "password":"password"}'

curl -X POST http://localhost:8080/member/me -H 'Content-Type:application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiZW5AdGVzdC5jb20iLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjkyNTg0NDY4fQ.IM2y-LeZzJz_d3rK0SoJ6ThrZJQGWtW6AmkqVKNoxF07LZHSqGVIJ1tYh2dEV17_RXHpnFbgMB0_UmAFFAVWDQ'
curl -X POST http://localhost:8080/member/logout -H 'Content-Type:application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiZW5AdGVzdC5jb20iLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjkwODc3OTA1fQ.lrJEKZ3ro7vGb20UhxLVesSIgjz7X-y5oU6iluwThO26zxLG1G4axd-Qm-sERYA8UzDKYRjAL6A_FfofiRR5JQ'
curl -X POST http://localhost:8080/auth/reissue -H 'Content-Type:application/json' -H 'Authorization: Bearer ' -d '{ "accessToken":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiZW4tMDFAa3IuYWNjb21tYXRlLmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2OTIyNzIyMTh9.JmF4HHryGAUW6CI3HkET60WQ4Mp-eNHaFRmzCFDcQ2S8ZdU0PF9WuIlmMjUk2zJVipLue4NeH57rW4by5wiXqQ", "refreshToken":"eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2OTI4NzUyMTh9.Z-hCktVNo_aPngHQX21UZ9wCsfQC35rbLivCm2VDv9AhO1DB9AwiWtka2GHkts8ej1v7YJe_1AIgF6FNlg5XUQ"}'

*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { headers, body } = req

    try {
        const { data, headers: returnedHeaders } = await axios.post(
            '/auth/signup', // Node.js backend path,
            body,
            {
                headers,
            }
        )
        res.send(data)
    } catch (error:any) {
        const status = error.response.status;
        const data = error.response.data;
        // Send status (probably 401) so the axios interceptor can run.
        res.status(status as number).json(data)
    }
}