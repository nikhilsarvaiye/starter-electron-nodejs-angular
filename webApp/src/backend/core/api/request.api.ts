
export class ApiRequest {
    static CorrelationId = class {
        public static new() {
            return new Date().getTime().toString();
        }
    }
}