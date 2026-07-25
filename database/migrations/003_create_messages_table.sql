CREATE Table messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER not NULL REFERENCES conversations(id),
    telegram_message_id INTEGER NOT NULL,
    sender_id BIGINT NOT NULL,
    text TEXT,
    telegram_date TIMESTAMPTZ NOT NULL,
    is_outgoing BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (conversation_id, telegram_message_id)
);