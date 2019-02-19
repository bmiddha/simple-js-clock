// Stores the currently-being-typechecked object for error messages.
let obj: any = null;
export class WeatherProxy {
    public readonly coord: CoordProxy;
    public readonly weather: WeatherEntityProxy[] | null;
    public readonly base: string;
    public readonly main: MainProxy;
    public readonly wind: WindProxy;
    public readonly clouds: CloudsProxy;
    public readonly dt: number;
    public readonly sys: SysProxy;
    public readonly id: number;
    public readonly name: string;
    public readonly cod: number;
    public static Parse(d: string): WeatherProxy {
        return WeatherProxy.Create(JSON.parse(d));
    }
    public static Create(d: any, field: string = "root"): WeatherProxy {
        if (!field) {
            obj = d;
            field = "root";
        }
        if (d === null || d === undefined) {
            throwNull2NonNull(field, d);
        } else if (typeof (d) !== "object") {
            throwNotObject(field, d, false);
        } else if (Array.isArray(d)) {
            throwIsArray(field, d, false);
        }
        d.coord = CoordProxy.Create(d.coord, field + ".coord");
        checkArray(d.weather, field + ".weather");
        if (d.weather) {
            for (let i = 0; i < d.weather.length; i++) {
                d.weather[i] = WeatherEntityProxy.Create(d.weather[i], field + ".weather" + "[" + i + "]");
            }
        }
        if (d.weather === undefined) {
            d.weather = null;
        }
        checkString(d.base, false, field + ".base");
        d.main = MainProxy.Create(d.main, field + ".main");
        d.wind = WindProxy.Create(d.wind, field + ".wind");
        d.clouds = CloudsProxy.Create(d.clouds, field + ".clouds");
        checkNumber(d.dt, false, field + ".dt");
        d.sys = SysProxy.Create(d.sys, field + ".sys");
        checkNumber(d.id, false, field + ".id");
        checkString(d.name, false, field + ".name");
        checkNumber(d.cod, false, field + ".cod");
        return new WeatherProxy(d);
    }
    private constructor(d: any) {
        this.coord = d.coord;
        this.weather = d.weather;
        this.base = d.base;
        this.main = d.main;
        this.wind = d.wind;
        this.clouds = d.clouds;
        this.dt = d.dt;
        this.sys = d.sys;
        this.id = d.id;
        this.name = d.name;
        this.cod = d.cod;
    }
}

export class CoordProxy {
    public readonly lon: number;
    public readonly lat: number;
    public static Parse(d: string): CoordProxy {
        return CoordProxy.Create(JSON.parse(d));
    }
    public static Create(d: any, field: string = "root"): CoordProxy {
        if (!field) {
            obj = d;
            field = "root";
        }
        if (d === null || d === undefined) {
            throwNull2NonNull(field, d);
        } else if (typeof (d) !== "object") {
            throwNotObject(field, d, false);
        } else if (Array.isArray(d)) {
            throwIsArray(field, d, false);
        }
        checkNumber(d.lon, false, field + ".lon");
        checkNumber(d.lat, false, field + ".lat");
        return new CoordProxy(d);
    }
    private constructor(d: any) {
        this.lon = d.lon;
        this.lat = d.lat;
    }
}

export class WeatherEntityProxy {
    public readonly id: number;
    public readonly main: string;
    public readonly description: string;
    public readonly icon: string;
    public static Parse(d: string): WeatherEntityProxy {
        return WeatherEntityProxy.Create(JSON.parse(d));
    }
    public static Create(d: any, field: string = "root"): WeatherEntityProxy {
        if (!field) {
            obj = d;
            field = "root";
        }
        if (d === null || d === undefined) {
            throwNull2NonNull(field, d);
        } else if (typeof (d) !== "object") {
            throwNotObject(field, d, false);
        } else if (Array.isArray(d)) {
            throwIsArray(field, d, false);
        }
        checkNumber(d.id, false, field + ".id");
        checkString(d.main, false, field + ".main");
        checkString(d.description, false, field + ".description");
        checkString(d.icon, false, field + ".icon");
        return new WeatherEntityProxy(d);
    }
    private constructor(d: any) {
        this.id = d.id;
        this.main = d.main;
        this.description = d.description;
        this.icon = d.icon;
    }
}

export class MainProxy {
    public readonly temp: number;
    public readonly pressure: number;
    public readonly humidity: number;
    public readonly temp_min: number;
    public readonly temp_max: number;
    public static Parse(d: string): MainProxy {
        return MainProxy.Create(JSON.parse(d));
    }
    public static Create(d: any, field: string = "root"): MainProxy {
        if (!field) {
            obj = d;
            field = "root";
        }
        if (d === null || d === undefined) {
            throwNull2NonNull(field, d);
        } else if (typeof (d) !== "object") {
            throwNotObject(field, d, false);
        } else if (Array.isArray(d)) {
            throwIsArray(field, d, false);
        }
        checkNumber(d.temp, false, field + ".temp");
        checkNumber(d.pressure, false, field + ".pressure");
        checkNumber(d.humidity, false, field + ".humidity");
        checkNumber(d.temp_min, false, field + ".temp_min");
        checkNumber(d.temp_max, false, field + ".temp_max");
        return new MainProxy(d);
    }
    private constructor(d: any) {
        this.temp = d.temp;
        this.pressure = d.pressure;
        this.humidity = d.humidity;
        this.temp_min = d.temp_min;
        this.temp_max = d.temp_max;
    }
}

export class WindProxy {
    public readonly speed: number;
    public readonly deg: number;
    public static Parse(d: string): WindProxy {
        return WindProxy.Create(JSON.parse(d));
    }
    public static Create(d: any, field: string = "root"): WindProxy {
        if (!field) {
            obj = d;
            field = "root";
        }
        if (d === null || d === undefined) {
            throwNull2NonNull(field, d);
        } else if (typeof (d) !== "object") {
            throwNotObject(field, d, false);
        } else if (Array.isArray(d)) {
            throwIsArray(field, d, false);
        }
        checkNumber(d.speed, false, field + ".speed");
        checkNumber(d.deg, false, field + ".deg");
        return new WindProxy(d);
    }
    private constructor(d: any) {
        this.speed = d.speed;
        this.deg = d.deg;
    }
}

export class CloudsProxy {
    public readonly all: number;
    public static Parse(d: string): CloudsProxy {
        return CloudsProxy.Create(JSON.parse(d));
    }
    public static Create(d: any, field: string = "root"): CloudsProxy {
        if (!field) {
            obj = d;
            field = "root";
        }
        if (d === null || d === undefined) {
            throwNull2NonNull(field, d);
        } else if (typeof (d) !== "object") {
            throwNotObject(field, d, false);
        } else if (Array.isArray(d)) {
            throwIsArray(field, d, false);
        }
        checkNumber(d.all, false, field + ".all");
        return new CloudsProxy(d);
    }
    private constructor(d: any) {
        this.all = d.all;
    }
}

export class SysProxy {
    public readonly type: number;
    public readonly id: number;
    public readonly message: number;
    public readonly country: string;
    public readonly sunrise: number;
    public readonly sunset: number;
    public static Parse(d: string): SysProxy {
        return SysProxy.Create(JSON.parse(d));
    }
    public static Create(d: any, field: string = "root"): SysProxy {
        if (!field) {
            obj = d;
            field = "root";
        }
        if (d === null || d === undefined) {
            throwNull2NonNull(field, d);
        } else if (typeof (d) !== "object") {
            throwNotObject(field, d, false);
        } else if (Array.isArray(d)) {
            throwIsArray(field, d, false);
        }
        checkNumber(d.type, false, field + ".type");
        checkNumber(d.id, false, field + ".id");
        checkNumber(d.message, false, field + ".message");
        checkString(d.country, false, field + ".country");
        checkNumber(d.sunrise, false, field + ".sunrise");
        checkNumber(d.sunset, false, field + ".sunset");
        return new SysProxy(d);
    }
    private constructor(d: any) {
        this.type = d.type;
        this.id = d.id;
        this.message = d.message;
        this.country = d.country;
        this.sunrise = d.sunrise;
        this.sunset = d.sunset;
    }
}

function throwNull2NonNull(field: string, d: any): never {
    return errorHelper(field, d, "non-nullable object", false);
}
function throwNotObject(field: string, d: any, nullable: boolean): never {
    return errorHelper(field, d, "object", nullable);
}
function throwIsArray(field: string, d: any, nullable: boolean): never {
    return errorHelper(field, d, "object", nullable);
}
function checkArray(d: any, field: string): void {
    if (!Array.isArray(d) && d !== null && d !== undefined) {
        errorHelper(field, d, "array", true);
    }
}
function checkNumber(d: any, nullable: boolean, field: string): void {
    if (typeof (d) !== "number" && (!nullable || (nullable && d !== null && d !== undefined))) {
        errorHelper(field, d, "number", nullable);
    }
}
function checkString(d: any, nullable: boolean, field: string): void {
    if (typeof (d) !== "string" && (!nullable || (nullable && d !== null && d !== undefined))) {
        errorHelper(field, d, "string", nullable);
    }
}
function errorHelper(field: string, d: any, type: string, nullable: boolean): never {
    if (nullable) {
        type += ", null, or undefined";
    }
    throw new TypeError("Expected " + type + " at " + field + " but found:\n" + JSON.stringify(d) + "\n\nFull object:\n" + JSON.stringify(obj));
}
