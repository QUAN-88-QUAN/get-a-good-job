type BandType<T, U> = T extends U ? never : T;

// declare function func<T>(x: BandType<T, string>): void;

function func<T>(x: BandType<T, string>):void {};

func("string");
func(100);
func({});
