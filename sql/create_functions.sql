CREATE OR REPLACE FUNCTION subject_id(IN short_name VARCHAR)
    RETURNS INTEGER AS $$
        BEGIN
            RETURN (SELECT id FROM subject WHERE subject.short_name=$1);
        END;
$$ LANGUAGE plpgsql;
