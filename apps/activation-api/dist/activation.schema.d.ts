import { Schema } from 'mongoose';
export declare const ActivationSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    customerId: number;
    plan: string;
    motivo_fallo: string;
    estado: string;
    historial: import("mongoose").Types.DocumentArray<{
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, {}, {}> & {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }>;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    customerId: number;
    plan: string;
    motivo_fallo: string;
    estado: string;
    historial: import("mongoose").Types.DocumentArray<{
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, {}, {}> & {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }>;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    customerId: number;
    plan: string;
    motivo_fallo: string;
    estado: string;
    historial: import("mongoose").Types.DocumentArray<{
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, {}, {}> & {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }>;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    customerId: number;
    plan: string;
    motivo_fallo: string;
    estado: string;
    historial: import("mongoose").Types.DocumentArray<{
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, {}, {}> & {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }>;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ActivationModel: import("mongoose").Model<{
    customerId: number;
    plan: string;
    motivo_fallo: string;
    estado: string;
    historial: import("mongoose").Types.DocumentArray<{
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, {}, {}> & {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }>;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    customerId: number;
    plan: string;
    motivo_fallo: string;
    estado: string;
    historial: import("mongoose").Types.DocumentArray<{
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, {}, {}> & {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }>;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    customerId: number;
    plan: string;
    motivo_fallo: string;
    estado: string;
    historial: import("mongoose").Types.DocumentArray<{
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, {}, {}> & {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }>;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    customerId: number;
    plan: string;
    motivo_fallo: string;
    estado: string;
    historial: import("mongoose").Types.DocumentArray<{
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, {}, {}> & {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }>;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    customerId: number;
    plan: string;
    motivo_fallo: string;
    estado: string;
    historial: import("mongoose").Types.DocumentArray<{
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, {}, {}> & {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }>;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    customerId: number;
    plan: string;
    motivo_fallo: string;
    estado: string;
    historial: import("mongoose").Types.DocumentArray<{
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, {}, {}> & {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }>;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    customerId: number;
    plan: string;
    motivo_fallo: string;
    estado: string;
    historial: import("mongoose").Types.DocumentArray<{
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, {}, {}> & {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }>;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    customerId: number;
    plan: string;
    motivo_fallo: string;
    estado: string;
    historial: import("mongoose").Types.DocumentArray<{
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }, {}, {}> & {
        customerId?: string | null | undefined;
        version?: number | null | undefined;
        eventId?: string | null | undefined;
        eventType?: string | null | undefined;
        occurredAt?: NativeDate | null | undefined;
        correlationId?: string | null | undefined;
        source?: string | null | undefined;
        payload?: any;
    }>;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>;
