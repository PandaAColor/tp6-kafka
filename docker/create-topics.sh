#!/bin/bash
# Crea los topics de negocio y sus DLQ (sección 05 del TP):
# 3 particiones, retención de 7 días. Es idempotente: si ya existen, no hace nada.
set -euo pipefail

BOOTSTRAP_SERVER="${BOOTSTRAP_SERVER:-kafka:9092}"
RETENTION_MS=604800000 # 7 días

TOPICS=(
  activation.requested
  billing.events
  provisioning.events
  activation.events
)

for topic in "${TOPICS[@]}"; do
  for name in "$topic" "$topic.dlq"; do
    /opt/kafka/bin/kafka-topics.sh \
      --bootstrap-server "$BOOTSTRAP_SERVER" \
      --create --if-not-exists \
      --topic "$name" \
      --partitions 3 \
      --replication-factor 1 \
      --config retention.ms="$RETENTION_MS"
  done
done

echo "Topics creados:"
/opt/kafka/bin/kafka-topics.sh --bootstrap-server "$BOOTSTRAP_SERVER" --list